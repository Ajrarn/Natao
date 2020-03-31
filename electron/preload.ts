import { contextBridge, ipcRenderer } from 'electron';
import IpcMainEvent = Electron.IpcMainEvent;
import IpcRendererEvent = Electron.IpcRendererEvent;

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
    sendSync: (channel: string, ...args: any[]) => {
      // whitelist channels
      let validChannels = ['setConfig','getConfig'];
      if (validChannels.includes(channel)) {
        return ipcRenderer.sendSync(channel, ...args);
      }
    },
    invoke: (channel: string, ...args: any[]) => {
      // whitelist channels
      let validChannels = ['readdir', 'mkDir', 'rmdir', 'readFile', 'writeFile', 'unlink', 'rename'];
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
    }
  }
);
