const { JSDOM } = require('jsdom')

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    // Creating an html document object model. An in-memory object that represents that tree structure
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements) {
        // Checking if URL is absolute or relative
        if (linkElement.href.slice(0, 1) === '/') {
            // relative logic
            try {
                const absoluteURL = new URL(`${baseURL}${linkElement.href}`)
                urls.push(absoluteURL.href)
            } catch (err) {
                console.log(`error with relative URL: ${err.message}`)
            }

        } else {
            // absolute logic
            try {
                const absoluteURL = new URL(linkElement.href)
                href = absoluteURL.href
                if (href.endsWith('/')) {
                    href = href.slice(0, -1)
                } urls.push(href)
            } catch (err) {
                console.log(`error with absolute URL: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(url) {
    const urlObj = new URL(url)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}
