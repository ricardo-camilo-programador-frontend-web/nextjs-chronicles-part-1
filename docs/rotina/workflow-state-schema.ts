// Workflow State Schema - Breath Natural (Next.js)
// Schema generico para manter contexto entre execucoes do workflow

export interface WorkflowStats {
  totalRuns: number
  issuesCreated: number
  issuesClosed: number
  issuesUpdated: number
  prsReviewed: number
  prsMerged: number
  discordMessages: number
  errors: number
}

export interface PRReviewInfo {
  lastReview: string
  reviewer: string
  status: 'approved' | 'changes_requested' | 'pending' | 'commented'
}

export interface GitHubState {
  processedIssues: Array<string>
  reviewedPRs: Record<string, PRReviewInfo>
  tags: Array<string>
}

export interface DiscordState {
  processedMessages: Array<string>
  lastMessageId: Record<string, string>
  messageToIssue: Record<string, string>
}

export interface WorkflowError {
  timestamp: string
  step: string
  error: string
  resolved: boolean
}

export interface WorkflowLock {
  acquired: string
  by: string
  expires: string
}

export interface WorkflowState {
  version: string
  lastRun: string
  nextRun: string
  stats: WorkflowStats
  github: GitHubState
  discord: DiscordState
  recentErrors: Array<WorkflowError>
  lock: WorkflowLock | null
}

export function createInitialState(): WorkflowState {
  const now = new Date().toISOString()

  return {
    version: '1.0.0',
    lastRun: new Date(0).toISOString(),
    nextRun: now,
    stats: {
      totalRuns: 0,
      issuesCreated: 0,
      issuesClosed: 0,
      issuesUpdated: 0,
      prsReviewed: 0,
      prsMerged: 0,
      discordMessages: 0,
      errors: 0,
    },
    github: {
      processedIssues: [],
      reviewedPRs: {},
      tags: [],
    },
    discord: {
      processedMessages: [],
      lastMessageId: {},
      messageToIssue: {},
    },
    recentErrors: [],
    lock: null,
  }
}

export function isIssueProcessed(state: WorkflowState, issueNumber: string): boolean {
  return state.github.processedIssues.includes(`#${issueNumber}`)
}

export function markIssueProcessed(state: WorkflowState, issueNumber: string): void {
  const key = `#${issueNumber}`
  if (!state.github.processedIssues.includes(key)) {
    state.github.processedIssues.push(key)
  }
}

export function isPRReviewed(state: WorkflowState, prNumber: string): boolean {
  return prNumber in state.github.reviewedPRs
}

export function needsReReview(
  state: WorkflowState,
  prNumber: string,
  hoursThreshold: number = 2,
): boolean {
  const reviewInfo = state.github.reviewedPRs[prNumber]
  if (!reviewInfo) return true

  const lastReviewTime = new Date(reviewInfo.lastReview).getTime()
  const thresholdMs = hoursThreshold * 60 * 60 * 1000

  return Date.now() - lastReviewTime > thresholdMs
}

export function markPRReviewed(
  state: WorkflowState,
  prNumber: string,
  status: PRReviewInfo['status'],
): void {
  state.github.reviewedPRs[prNumber] = {
    lastReview: new Date().toISOString(),
    reviewer: 'agent',
    status,
  }
}

export function isMessageProcessed(state: WorkflowState, messageId: string): boolean {
  return state.discord.processedMessages.includes(messageId)
}

export function markMessageProcessed(state: WorkflowState, messageId: string): void {
  if (!state.discord.processedMessages.includes(messageId)) {
    state.discord.processedMessages.push(messageId)
  }
}

export function getIssueForMessage(state: WorkflowState, messageId: string): string | null {
  return state.discord.messageToIssue[messageId] ?? null
}

export function linkMessageToIssue(
  state: WorkflowState,
  messageId: string,
  issueNumber: string,
): void {
  state.discord.messageToIssue[messageId] = `#${issueNumber}`
}

export function updateLastMessageId(
  state: WorkflowState,
  channelId: string,
  messageId: string,
): void {
  state.discord.lastMessageId[channelId] = messageId
}

export function addError(state: WorkflowState, step: string, errorMessage: string): void {
  state.recentErrors.push({
    timestamp: new Date().toISOString(),
    step,
    error: errorMessage,
    resolved: false,
  })
  state.stats.errors += 1
}

export function cleanupState(state: WorkflowState): void {
  const maxProcessedItems = 100
  const maxErrors = 10

  state.github.processedIssues = state.github.processedIssues.slice(-maxProcessedItems)
  state.discord.processedMessages = state.discord.processedMessages.slice(-maxProcessedItems)
  state.recentErrors = state.recentErrors.slice(-maxErrors)
}

export function incrementStat(
  state: WorkflowState,
  stat: keyof WorkflowStats,
  amount: number = 1,
): void {
  state.stats[stat] += amount
}
