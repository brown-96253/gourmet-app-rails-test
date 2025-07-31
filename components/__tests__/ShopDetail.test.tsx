import { render, screen, fireEvent } from '@testing-library/react';
import ShopDetail from '@/app/shop/[id]/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    id: '1',
  }),
}));

describe('ShopDetail', () => {
  it('お店の詳細情報が正しく表示される', () => {
    render(<ShopDetail />);
    
    expect(screen.getByText('BRIGHT COFFEE STAND')).toBeInTheDocument();
    expect(screen.getByText(/名古屋市・カフェ/)).toBeInTheDocument();
    expect(screen.getByText(/★ 4.8/)).toBeInTheDocument();
    expect(screen.getByText(/散策の途中に/)).toBeInTheDocument();
    const image = screen.getByAltText('BRIGHT COFFEE STAND') as HTMLImageElement;
    expect(image.src).toContain('/images/1.webp');
  });

  it('「一覧に戻る」ボタンが動作する', () => {
    const mockPush = jest.fn();
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({ push: mockPush });
    
    render(<ShopDetail />);
    const backButton = screen.getByRole('button', { name: /一覧に戻る/i });
    fireEvent.click(backButton);
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('お店が見つからない場合の表示', () => {
    jest.spyOn(require('next/navigation'), 'useParams').mockReturnValue({ id: '999' });
    render(<ShopDetail />);
    
    expect(screen.getByText('お店が見つかりません')).toBeInTheDocument();
  });
});