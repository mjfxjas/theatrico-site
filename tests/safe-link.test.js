import assert from 'node:assert/strict'
import test from 'node:test'
import { safeLinkAttributes } from '../src/components/safe-link.js'

for (const href of ['javascript:alert(1)', '  JAVASCRIPT:alert(1)', 'java\nscript:alert(1)', '\tjavascript:alert(1)', 'data:text/html,example', 'vbscript:msgbox(1)']) {
  test(`blocks executable URL ${JSON.stringify(href)}`, () => {
    assert.equal(safeLinkAttributes(href).href, '#')
  })
}

for (const href of ['/film', '/a page', '#team', 'mailto:hello@example.com', 'tel:+15555550100']) {
  test(`preserves supported destination ${href}`, () => {
    assert.deepEqual(safeLinkAttributes(href), { href })
  })
}

test('external links preserve caller rel tokens and cannot remove opener protection', () => {
  assert.deepEqual(safeLinkAttributes('HTTPS://example.com', { rel: 'nofollow' }), {
    href: 'HTTPS://example.com', target: '_blank', rel: 'nofollow noopener noreferrer',
  })
})

test('explicit new-tab targets on local links receive opener protection', () => {
  assert.equal(safeLinkAttributes('/film', { target: '_blank' }).rel, 'noopener noreferrer')
  assert.equal(safeLinkAttributes('/film', { target: '_BLANK' }).rel, 'noopener noreferrer')
  assert.equal(safeLinkAttributes('//example.com', { target: '_self' }).target, '_self')
})

test('missing and non-string destinations fall back safely', () => {
  for (const href of [null, undefined, {}, 42, '']) {
    assert.equal(safeLinkAttributes(href).href, '#')
  }
})
