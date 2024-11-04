// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import fs from 'node:fs';
import os from 'node:os';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  files: {
    readProjectsDir: () => {
      return fs.readdirSync(os.homedir() + '/Documents/Worldbuilder');
    },
    checkIfProjectExists: (projectName: string) => {
      return fs.existsSync(
        os.homedir() + '/Documents/Worldbuilder/' + projectName,
      );
    },
    createNewProject: (data: string, projectName: string) => {
      const dir = 'C:/Users/Teje/Documents/Worldbuilder/' + projectName;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      fs.writeFile(dir + '/data.json', data, (err) => {
        if (err) console.log(err);
        else {
          console.log('File written successfully\n');
        }
      });
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
