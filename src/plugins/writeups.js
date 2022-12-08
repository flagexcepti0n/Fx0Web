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
                                props.$store.commit('addCtf', item.name)
                            })
                        })
                    }
                })
            }
        }
    }
}