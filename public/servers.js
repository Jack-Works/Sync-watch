/**
 * __sync_watch__ can be one of the following:
 * * a url (string)
 * * many url (string[])
 * * an object (See ./src/Comps/gun.d.ts)
 */
{
    if (location.hostname === 'localhost') {
        window.__sync_watch__ = 'http://localhost:8765/gun'
    } else {
        window.__sync_watch__ = '/gun'
    }
}
