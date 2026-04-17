export interface WorkflowStats {
  totalRuns: number
  issuesCreated: number
  issuesClosed: number
  issuesUpdated: number
  prsReviewed: number
  prsMerged: number
  labelsAdded: number
  tagsCreated: number
  errors: number
}

export interface PRReviewInfo {
  lastReview: string
  reviewer: string
  status: 'approved' | 'changes_requested' | 'pending' | 'commented'
  filesReviewed: number
  commentsCount: number
}

export interface GitHubState {
  processedIssues: Array<string>
  reviewedPRs: Record<string, PRReviewInfo>
  tags: Array<string>
  releases: Array<string>
  staleIssues: Array<string>
}

export interface CodeQualityIssue {
  file: string
  line: number
  rule: string
  severity: 'error' | 'warning' | 'info'
  message: string
}

export interface TechDebtItem {
  id: string
  area: string
  description: string
  priority: 'high' | 'medium' | 'low'
  estimatedEffort: string
  created: string
  resolved?: boolean
}

export interface DependencyStatus {
  outdated: number
  vulnerable: number
  lastCheck: string
}

export interface CodeQualityState {
  lastAnalysis: string
  score: number
  issues: Array<CodeQualityIssue>
  techDebt: Array<TechDebtItem>
  dependencies: DependencyStatus
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
  codeQuality: CodeQualityState
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
      labelsAdded: 0,
      tagsCreated: 0,
      errors: 0,
    },
    github: {
      processedIssues: [],
      reviewedPRs: {},
      tags: [],
      releases: [],
      staleIssues: [],
    },
    codeQuality: {
      lastAnalysis: new Date(0).toISOString(),
      score: 100,
      issues: [],
      techDebt: [],
      dependencies: {
        outdated: 0,
        vulnerable: 0,
        lastCheck: new Date(0).toISOString(),
      },
    },
    recentErrors: [],
    lock: null,
  }
}

// Issue helpers
export function isIssueProcessed(state: WorkflowState, issueNumber: string): boolean {
  return state.github.processedIssues.includes(`#${issueNumber}`)
}

export function markIssueProcessed(state: WorkflowState, issueNumber: string): void {
  const key = `#${issueNumber}`
  if (!state.github.processedIssues.includes(key)) {
    state.github.processedIssues.push(key)
  }
}

export function isStaleIssue(state: WorkflowState, issueNumber: string): boolean {
  return state.github.staleIssues.includes(`#${issueNumber}`)
}

export function markIssueStale(state: WorkflowState, issueNumber: string): void {
  const key = `#${issueNumber}`
  if (!state.github.staleIssues.includes(key)) {
    state.github.staleIssues.push(key)
  }
}

// PR helpers
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
  filesReviewed: number = 0,
  commentsCount: number = 0,
): void {
  state.github.reviewedPRs[prNumber] = {
    lastReview: new Date().toISOString(),
    reviewer: 'agent',
    status,
    filesReviewed,
    commentsCount,
  }
}

// Tag helpers
export function addTag(state: WorkflowState, tag: string): void {
  if (!state.github.tags.includes(tag)) {
    state.github.tags.push(tag)
    state.stats.tagsCreated += 1
  }
}

export function addRelease(state: WorkflowState, release: string): void {
  if (!state.github.releases.includes(release)) {
    state.github.releases.push(release)
  }
}

// Code Quality helpers
export function addCodeQualityIssue(
  state: WorkflowState,
  issue: CodeQualityIssue,
): void {
  state.codeQuality.issues.push(issue)
}

export function addTechDebtItem(state: WorkflowState, item: TechDebtItem): void {
  state.codeQuality.techDebt.push(item)
}

export function updateCodeQualityScore(state: WorkflowState, score: number): void {
  state.codeQuality.score = Math.max(0, Math.min(100, score))
  state.codeQuality.lastAnalysis = new Date().toISOString()
}

export function updateDependencyStatus(
  state: WorkflowState,
  outdated: number,
  vulnerable: number,
): void {
  state.codeQuality.dependencies = {
    outdated,
    vulnerable,
    lastCheck: new Date().toISOString(),
  }
}

// Error handling
export function addError(state: WorkflowState, step: string, errorMessage: string): void {
  state.recentErrors.push({
    timestamp: new Date().toISOString(),
    step,
    error: errorMessage,
    resolved: false,
  })
  state.stats.errors += 1
}

export function resolveErrors(state: WorkflowState, step?: string): void {
  state.recentErrors.forEach((error) => {
    if (!step || error.step === step) {
      error.resolved = true
    }
  })
}

// Cleanup
export function cleanupState(state: WorkflowState): void {
  const maxProcessedItems = 100
  const maxErrors = 10
  const maxIssues = 50
  const maxTechDebt = 20

  state.github.processedIssues = state.github.processedIssues.slice(-maxProcessedItems)
  state.recentErrors = state.recentErrors.slice(-maxErrors)
  state.codeQuality.issues = state.codeQuality.issues.slice(-maxIssues)

  // Remove resolved tech debt older than 30 days
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  state.codeQuality.techDebt = state.codeQuality.techDebt
    .filter((item) => {
      if (!item.resolved) return true
      return new Date(item.created).getTime() > thirtyDaysAgo
    })
    .slice(-maxTechDebt)
}

// Stats
export function incrementStat(
  state: WorkflowState,
  stat: keyof WorkflowStats,
  amount: number = 1,
): void {
  state.stats[stat] += amount
}
