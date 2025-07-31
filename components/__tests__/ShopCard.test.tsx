import { render, screen, fireEvent } from '@testing-library/react';
import ShopCard from '@/components/ShopCard';

const mockShop = {
  id: 1,
  name: 'BRIGHT COFFEE STAND',
  genre: 'カフェ',
  rating: 4.8,
  address: '愛知県名古屋市熱田区神宮3丁目1−2',
  image: '/images/1.webp',
  description: '散策の途中に、小さな癒しのコーヒースタンド',
  area: '名古屋市',
};

describe('ShopCard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('店舗情報が正しく表示される', () => {
    render(<ShopCard shop={mockShop} index={0} />);
    
    expect(screen.getByText('BRIGHT COFFEE STAND')).toBeInTheDocument();
    expect(screen.getByText(/カフェ/)).toBeInTheDocument();
    expect(screen.getByText(/名古屋市/)).toBeInTheDocument();
    expect(screen.getByText(/散策の途中に/)).toBeInTheDocument();
    expect(screen.getByText(/★ 4.8/)).toBeInTheDocument();
    const image = screen.getByAltText('BRIGHT COFFEE STAND') as HTMLImageElement;
    expect(image.src).toContain('/images/1.webp');
  });

  it('お気に入りボタンがクリックで切り替わる', () => {
    render(<ShopCard shop={mockShop} index={0} />);
    
    const button = screen.getByRole('button', { name: /お気に入り/i });
    const heartImg = screen.getByAltText('お気に入りに追加');

    // 初期はお気に入りではない
    expect(heartImg).toBeInTheDocument();

    // クリックするとお気に入りになる
    fireEvent.click(button);
    expect(screen.getByAltText('お気に入り済み')).toBeInTheDocument();

    // 再クリックでお気に入り解除
    fireEvent.click(button);
    expect(screen.getByAltText('お気に入りに追加')).toBeInTheDocument();
  });
});
