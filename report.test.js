const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')


test('sortPages - strip: protocol', () => {
    const input = {
        'https//brwsk.space': 1,
        'https//brwsk.space/contact': 2
    }
    const output = sortPages(input)
    const expected = [['https//brwsk.space/contact', 2], ['https//brwsk.space', 1]]
    expect(output).toEqual(expected)
})