# Sync Watch

> **This project is no longer maintained, last update at Feb 14, 2019**

- Watch video with your friend.
- Play local file (Sync Watch will not share it for you) or Youtube.
- Sync watch progress and chat.

Have a try at https://sync-watch.vola.xyz/

## Details

<img src="https://raw.githubusercontent.com/Jack-Works/Sync-watch/master/screenshot.png" width="400" alt="A screenshot of Sync Watch" />

Sync watch is an experimental project that built with [GUN.js](https://github.com/amark/gun) (as the decentralized database) and [React UWP](https://www.react-uwp.com/).

Welcome to contribute your GUN server!

### Host your own instance

#### Frontend

Edit [./public/servers.js](./public/servers.js) to set your own [GUN](https://github.com/amark/gun) servers.

> yarn

> yarn build

#### Backend

See:
https://github.com/Jack-Works/sync-watch-server

(It is a plain GUN server.)
