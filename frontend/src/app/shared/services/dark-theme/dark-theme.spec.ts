import { DarkThemeService } from "./dark-theme.service";

describe('DarkThemeService', () => {
  let service: DarkThemeService;

  beforeEach(() => {
    service = new DarkThemeService();
  });

  it('should toggle dark mode class on document body', () => {
    const body = document.body;
    expect(body.classList.contains('dark-theme')).toBeFalse();

    spyOn(service, 'darkMode').and.callThrough();
    service.darkMode();

    expect(service.darkMode).toHaveBeenCalled();
    expect(service.darkMode).toHaveBeenCalledTimes(1);
    expect(body.classList.contains('dark-theme')).toBeTrue();
  });
});
