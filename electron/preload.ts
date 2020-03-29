import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
    sendSync: (channel: string, ...args: any[]) => {
      // whitelist channels
      let validChannels = ['ping','setConfig','getConfig', 'getPath'];
      if (validChannels.includes(channel)) {
        return ipcRenderer.sendSync(channel, ...args);
      }
    },
    /*receive: (channel, func) => {
      let validChannels = ['getPath','getConfig'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }*/
  }
);
