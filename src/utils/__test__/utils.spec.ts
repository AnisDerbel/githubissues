import {getColor} from '../utils';

const mockGetColor = getColor as jest.MockedFunction<typeof getColor>;

describe('getColor for tag label', () => {
  it('should return black color when background color is light', () => {
    expect(mockGetColor('eedd82')).toBe('black');
  });
  it('should return white color when background color is dark', () => {
    expect(mockGetColor('1d0275')).toBe('white');
  });
});
