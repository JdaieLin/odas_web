const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Expose a function to send data to the main process
  send: (channel, data) => {
    // Whitelist channels
    let validChannels = [
        'open-configure-window',
        'open-recordings-window',
        'open-share-window',
        'new-recording',
        'end-recording',
        'tracking'
    ];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  // Expose a function to receive data from the main process
  on: (channel, func) => {
    let validChannels = ['newTracking', 'newPotential'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
