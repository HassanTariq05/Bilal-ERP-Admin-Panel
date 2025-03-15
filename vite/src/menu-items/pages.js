// assets
import { IconKey, IconWallet } from '@tabler/icons-react';

// constant
const icons = {
  IconKey,
  IconWallet
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  // caption: 'Pages Caption',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'login',
          title: 'login',
          type: 'item',
          url: '/pages/login',
          target: true
        },
        {
          id: 'register',
          title: 'register',
          type: 'item',
          url: '/pages/register',
          target: true
        }
      ]
    },
    {
      id: 'accounts',
      title: 'Accounts',
      type: 'collapse',
      icon: icons.IconWallet,
      children: [
        {
          id: 'chart-of-accounts',
          title: 'Chart of Accounts',
          type: 'item',
          url: '/pages/accounts/chart-of-accounts',
          target: false
        }
      ]
    }
  ]
};

export default pages;
