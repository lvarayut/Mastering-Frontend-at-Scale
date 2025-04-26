# 04 - Testing Strategy

## 1. Setting up the Testing Environment

### Step 1: Install Required Dependencies
First, let's install all the necessary testing packages:

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event ts-node @types/jest ts-jest identity-obj-proxy
```

This installs:
- `jest`: Core testing framework
- `jest-environment-jsdom`: Simulates a browser environment for DOM testing
- `@testing-library/react`: Utilities for testing React components
- `@testing-library/dom`: DOM testing utilities
- `@testing-library/jest-dom`: Custom DOM element matchers for Jest
- `@testing-library/user-event`: Simulates user interactions
- `ts-node` & `@types/jest`: TypeScript support for Jest
- `ts-jest`: TypeScript preprocessor for Jest
- `identity-obj-proxy`: Handles CSS modules in tests

### Step 2: Configure Jest
1. Copy `jest.config.ts` from the `start` folder to your project root

2. In the `package.json`, add a new script to run jest:
    ```json
    "test": "jest",
    "test:watch": "jest --watch"
    ```

## 2. Writing Your First Integration Tests

### Testing the Header Component

1. Create a `__tests__` folder inside the `components/Header`

2. Create `Header.test.tsx` with the following tests:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

// Helper function to render the Header component
const renderHeader = () => {
  return render(<Header />);
};

describe('Header Component', () => {
  it('renders the logo text correctly', () => {
    renderHeader();
    const logoText = screen.getByText('MyTube');
    expect(logoText).toBeInTheDocument();
  });

  it('renders all action buttons', () => {
    renderHeader();
    const createButton = screen.getByLabelText('Create');
    const notificationsButton = screen.getByLabelText('Notifications');
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
```

## 3. Practice Exercise

### Your Task
Add integration tests to the SideBar component following the same pattern we used for the Header component. Consider testing:
- Navigation links rendering
- Active state of selected items
- Click interactions
- Any dynamic content

### Tips for Writing Tests
1. Test user interactions, not implementation details
2. Use semantic queries (getByRole, getByLabelText) when possible
3. Write tests that reflect how users interact with your components
4. Keep tests focused and isolated
