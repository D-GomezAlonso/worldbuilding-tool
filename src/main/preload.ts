// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge } from 'electron';
import fs from 'node:fs';
import os from 'node:os';

export type Channels = 'ipc-example';

const PROJECTS_DIRECTORY = os.homedir() + '/Documents/Worldbuilder/';

const electronHandler = {
  files: {
    getProjectsDirectory() {
      return PROJECTS_DIRECTORY;
    },
    readProjectsDir() {
      return fs.readdirSync(PROJECTS_DIRECTORY);
    },
    checkIfProjectExists(projectName: string) {
      return fs.existsSync(PROJECTS_DIRECTORY + projectName);
    },
    createNewProject(data: string, projectName: string) {
      const dir = PROJECTS_DIRECTORY + projectName;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      fs.writeFile(dir + '/data.json', data, (err) => {
        if (err) return '';
      });

      return dir + '/data.json';
    },
    loadProject(projectName: string) {
      const dir = PROJECTS_DIRECTORY + projectName;
      if (fs.existsSync(dir)) {
        return fs.readFileSync(dir + '/data.json', 'utf-8');
      }
      return '';
    },
    saveProject(projectDir: string, data: string) {
      const dir = projectDir;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      fs.writeFile(dir + '/data.json', data, (err) => {
        if (err) return 'error';
      });

      return dir + '/data.json';
    },
    saveImage(projectDir: string, image: File) {
      console.log(image);
      const destinationDir = `${projectDir}/images/${image.name}`;
      if (!fs.existsSync(`${projectDir}/images/`)) {
        fs.mkdirSync(`${projectDir}/images/`);
      }

      fs.copyFile(image.path, destinationDir, function callback(err) {
        if (err) throw err;
      });

      return destinationDir;
    },
    readSavedImage(imagePath: string) {
     return fs.readFileSync(imagePath).toString('base64');
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
