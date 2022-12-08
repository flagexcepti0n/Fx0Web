export default {
    install(app, options) {
        let props = app.config.globalProperties
        props.$writeups = {
            getCtfs() {
                // Get the folder list from the write-ups repo
                fetch('https://api.github.com/repos/flagexcepti0n/write-ups/contents').then(response => {
                    //check if the response is ok
                    if (response.ok) {
                        //get the name of every folder in the write-ups repo
                        response.json().then(content => {
                            content.filter(item => item.type === "dir").forEach(item => {
                                props.$store.commit('addCtf', {ctf: item.name})
                            })
                        })
                    }
                })
            },
            getWriteups(ctf) {
                console.log("Getting write-ups for " + ctf)
                // Get the file list from the write-ups repo
                fetch(`https://api.github.com/repos/flagexcepti0n/write-ups/contents/${ctf}`).then(response => {
                    //check if the response is ok
                    if (response.ok) {
                        //get the name of every file in the write-ups repo
                        response.json().then(content => {
                            content.filter(item => item.type === "file" && item.name.endsWith(".md")).forEach(item => {
                                props.$store.commit('addWriteup', {ctf, writeup: item.name})
                            })
                        })
                    }
                })
            }
        }
    }
}