const { normalizeURL } = require('./crawl.js')
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