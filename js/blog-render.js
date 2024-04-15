const render_area = document.getElementById("blog-area")
let url_arguments = new URLSearchParams(window.location.search)

async function renderBlog(page) {
    let response = await fetch(`/blogs/${page}.html`)
    let html_content = await response.text()

    if (response.status === 404) {
        return `<p>Blog not found on server, check UUID.</p>`
    }
    return html_content
}

document.querySelectorAll("#nav-bar p").forEach((element) => {
    let blog_tags_list = element.getAttribute("tags").split(" ")
    element.innerText += ` (${blog_tags_list.join(', ')})`

    element.addEventListener("click", () => {
        let blog_id = element.getAttribute("uuid")
        let blog_name = element.getAttribute("name")
        let blog_created = element.getAttribute("created")
        let blog_updated = element.getAttribute("updated")
        let blog_tags = element.getAttribute("tags")

        renderBlog(blog_id).then((value) => {
            render_area.innerHTML = `
                    <h1>${blog_name}</h1>
                    <p>Created ${blog_created} / Updated ${blog_updated}</p>
                    <p>${blog_tags}</p>
                    <hr>
                    `

            render_area.innerHTML += value

            window.history.replaceState(
                {},
                "IWick Blog",
                window.location.origin + window.location.pathname + `?blog=${blog_id}`
            )
        })
    })
})

if ( url_arguments.get("blog") ) {
    let elm = document.querySelector(`#nav-bar p[uuid=${url_arguments.get("blog")}]`)
    if (elm) {
        elm.click()
    } else {
        document.querySelector("#nav-bar p").click()
    }
} else {
    document.querySelector("#nav-bar p").click()
}