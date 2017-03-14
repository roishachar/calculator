import { RoboPage } from './app.po';

describe('robo App', () => {
  let page: RoboPage;

  beforeEach(() => {
    page = new RoboPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
