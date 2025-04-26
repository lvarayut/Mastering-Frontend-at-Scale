import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../';

// Helper function to render the Header component
function renderHeader() {
  return render(<Header avatarUrl="/default-avatar.png" />);
}

describe('Header Component', () => {
  it('renders the logo text correctly', () => {
    renderHeader();
    const logoText = screen.getByText('MyTube');
    expect(logoText).toBeInTheDocument();
  });

  it('renders all action buttons', () => {
    renderHeader();
    const createButton = screen.getByLabelText('Create');
    const notificationsButton = screen.getByLabelText('Notification');
    const userMenuButton = screen.getByLabelText('User menu');

    expect(createButton).toBeInTheDocument();
    expect(notificationsButton).toBeInTheDocument();
    expect(userMenuButton).toBeInTheDocument();
  });

  it('updates search input value when user types', async () => {
    renderHeader();
    const searchInput = screen.getByPlaceholderText('Search');

    await userEvent.type(searchInput, 'test search');
    expect(searchInput).toHaveValue('test search');
  });
});
