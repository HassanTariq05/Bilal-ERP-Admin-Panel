import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// pages routing
const PagesChartOfAccounts = Loadable(lazy(() => import('views/pages/accounts/chart-of-accounts/index')));
const PageControlChartOfAccounts = Loadable(lazy(() => import('views/pages/accounts/chart-of-accounts/control-account/index')));
const PageControlSubChartOfAccounts = Loadable(
  lazy(() => import('views/pages/accounts/chart-of-accounts/control-account/sub-control-account/index'))
);
const PageControlTransactionChartOfAccounts = Loadable(
  lazy(() => import('views/pages/accounts/chart-of-accounts/control-account/sub-control-account/transaction-account/index'))
);

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));

const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'pages',
      children: [
        {
          path: 'accounts',
          children: [
            {
              path: 'chart-of-accounts',
              element: <PagesChartOfAccounts />
            },
            {
              path: 'control-account/:id',
              element: <PageControlChartOfAccounts />
            },
            {
              path: 'sub-control-account/:id/:sub_id',
              element: <PageControlSubChartOfAccounts />
            },
            {
              path: 'transaction-account/:id',
              element: <PageControlTransactionChartOfAccounts />
            }
          ]
        }
      ]
    },
    {
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
