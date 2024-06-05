export const ibisaUrls = {
    process: {
      instantiate: (tenant: string) =>
        `https://process.ibisagroup.com/api/v1/process-definition/instantiate?tenant=${tenant}`,
    },
  
    toolbox: {
      notifacion: (tenant: string) => `https://toolbox.ibisagroup.com/notifications?tenant=${tenant}`
    }
  };
  