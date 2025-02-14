import { toast } from 'sonner';

interface ToastOptions {
  description?: string;
  duration?: number;
}

export const useToast = () => {
  return {
    success: (message: string, options?: ToastOptions) => {
      toast.success(message, {
        duration: options?.duration || 3000,
        description: options?.description,
        icon: '🌱',
      });
    },

    error: (message: string, options?: ToastOptions) => {
      toast.error(message, {
        duration: options?.duration || 4000,
        description: options?.description,
        icon: '🥀',
      });
    },

    warning: (message: string, options?: ToastOptions) => {
      toast.warning(message, {
        duration: options?.duration || 3500,
        description: options?.description,
        icon: '🌿',
      });
    },

    info: (message: string, options?: ToastOptions) => {
      toast.info(message, {
        duration: options?.duration || 3000,
        description: options?.description,
        icon: '🪴',
      });
    },
  };
};
