import { render, screen } from '@testing-library/react';
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
  it('Formrunのiframeが表示される', () => {
    render(<ShopDetail />);
    const iframe = screen.getByTitle('フォーム');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('form.run'));
  });
});