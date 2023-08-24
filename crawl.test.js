const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')


test('normalizeURL - strip: protocol', () => {
    const input = 'http://brwsk.space/contact'
    const output = normalizeURL(input)
    const expected = 'brwsk.space/contact'
    expect(output).toEqual(expected)
})

test('normalizeURL - strip: secure protocol', () => {
    const input = 'https://brwsk.space/contact'
    const output = normalizeURL(input)
    const expected = 'brwsk.space/contact'
    expect(output).toEqual(expected)
})

test('normalizeURL - strip: protocol, trailing slash', () => {
    const input = 'http://brwsk.space/contact/'
    const output = normalizeURL(input)
    const expected = 'brwsk.space/contact'
    expect(output).toEqual(expected)
})

test('normalizeURL - case sensitivity', () => {
    const input = 'http://BRWSK.space/contact/'
    const output = normalizeURL(input)
    const expected = 'brwsk.space/contact'
    expect(output).toEqual(expected)
})

test('getURLsFromHTML - Absolute', () => {
    const inputBaseURL = "https://brwsk.space"
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://brwsk.space"
                brwsk.space website
            </a>
        </body>
    </html >`

    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://brwsk.space"]
    expect(output).toEqual(expected)

})

test('getURLsFromHTML - Relative', () => {
    const inputBaseURL = "https://brwsk.space"
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/contact"
                brwsk.space contact page
            </a>
        </body>
    </html>`

    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://brwsk.space/contact"]
    expect(output).toEqual(expected)

})

test('getURLsFromHTML - Absolute & Relative', () => {
    const inputBaseURL = "https://brwsk.space"
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://brwsk.space"
                brwsk.space website
            </a>

            <a href="/contact"
                brwsk.space contact page
            </a>

        </body>
    </html>`

    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://brwsk.space", "https://brwsk.space/contact"]
    expect(output).toEqual(expected)

})

test('getURLsFromHTML - Invalid URL', () => {
    const inputBaseURL = "https://brwsk.space"
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalidStuff"
                brwsk.space contact page
            </a>
        </body>
    </html>`

    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(output).toEqual(expected)

})