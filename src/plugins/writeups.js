export default {
    install(app, options) {
        let props = app.config.globalProperties
        props.$writeups = {
            getCtfs() {
                console.log("Getting ctfs")
                // Get the folder list from the write-ups repo
                fetch('https://api.github.com/repos/flagexcepti0n/write-ups/contents').then(response => {
                    //check if the response is ok
                    if (response.ok) {
                        //get the name of every folder in the write-ups repo
                        response.json().then(content => {
                            content.filter(item => item.type === "dir").forEach(item => {
                                props.$store.commit('addCtf', item.name)
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
            },
            getMarkdown(ctf, writeup) {
                console.log("Getting write-up " + writeup + " for " + ctf)
                // Get the file from the write-ups repo
                fetch(`https://raw.githubusercontent.com/flagexcepti0n/write-ups/main/${ctf}/${writeup}`, {
                    headers: {
                        'Accept': 'application/vnd.github.raw'
                    }
                }).then(response => {
                    //check if the response is ok
                    if (response.ok) {
                        //get the content of the file
                        response.text().then(markdown => {
                            // decode the base64 content
                            props.$store.commit('addMarkdown',{ ctf, writeup, markdown})
                        })
                    }
                })
            },
            getRessource(ctf, ressource) {
                console.log("Getting ressource " + ressource + " for " + ctf)
                // Get the resource from the write-ups repo
                fetch(`https://api.github.com/repos/flagexcepti0n/write-ups/contents/${ctf}/${writeup}`).then(response => {
                    //check if the response is ok
                    if (response.ok) {
                        //return the url of the resource content
                        response.json().then(content => {
                            return content.download_url;
                        })
                    }
                })
            }
        }
    }
}