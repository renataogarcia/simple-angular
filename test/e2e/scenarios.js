'use strict';
// Check scenario api at http://code.angularjs.org/1.1.5/docs/guide/dev_guide.e2e-testing
describe('Simple Angular App', function () {

  it('should display a message when no contacts', function () {
    browser().navigateTo('/index.html');
    expect(element('p').text()).toBe('No contacts found.');
  });

  it('should display new contact view', function () {
    element('#newBtn').click();
    expect(browser().location().url()).toBe('/newContact');
    expect(element('h2').text()).toBe('Contact details:');
  });

  it('should save the new contact and display in the main list', function () {
    input('contact.name').enter('Paul'); // We can use the bindings!
    input('contact.email').enter('paul@email.com');
    element('#saveBtn').click(); // This is an ajax call. No 'waits' needed.
    expect(browser().location().url()).toBe('/');
    expect(repeater('table tbody tr').column('contact.name')).toEqual(['Paul']);
  });

  it('should filter contacts', function () {
    input('contactSearch').enter('Pa');
    expect(repeater('table tbody tr').column('contact.name')).toEqual(['Paul']);
    input('contactSearch').enter('Px');
    expect(element('p').text()).toBe('No contacts found.');
    input('contactSearch').enter('');
  });

  it('should remove contacts', function () {
    element('table tbody tr td a[name="remove"]').click();
    expect(element('p').text()).toBe('No contacts found.');
  });

});