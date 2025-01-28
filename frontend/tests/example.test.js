import { describe, it, beforeEach, expect, vi } from 'vitest';
import DesktopApp from '../sources/app/base/desktopApp';
import * as webix from 'webix';

describe('Webix Jet App', () => {
  let app;

  beforeEach(() => {
    // Mock the History API to prevent errors in jsdom
    global.window.history.pushState = vi.fn();
    global.window.history.replaceState = vi.fn();

    // Initialize the DesktopApp before each test
    app = new DesktopApp();
    app.render(document.createElement('div')); // Simulate rendering
    console.log("HALLO " , app.getUrl());
    console.log("HALLO " , app.getRouter().get());

});

  it('should have a correct app name', () => {
    expect(app.config.name).toBe('PPV'); // Ensure the app name is set correctly
  });

  it('should start at /top/start', () => {
    // Check the app's starting URL
    const currentRoute = app.getUrl();
    expect(currentRoute).toBe('/top/start');
  });
});
