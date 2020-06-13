export type IDivider = 'divider'

export interface IRouteParam {
  path: string
  elementId: string
  label?: string
  icon?: string
  params?: { [key: string]: any }
  divider?: boolean
  requireUser?: boolean
  children?: Array<IRouteParamOrDivider>
}

export type IRouteParamOrDivider = IRouteParam | IDivider

export interface IJourney {
  rootJourney: Array<IRouteParamOrDivider>
}

export const JOURNEY: IJourney = {

  rootJourney: [
    {
      path: '',
      elementId: 'main',
      children: [
        { path: '/', elementId: 'welcome', label: 'Home', requireUser: false, icon: 'home' },
        'divider',
        { path: 'counter', elementId: 'counter', label: 'Counter', requireUser: false },
        { path: 'editquestion', elementId: 'editquestion', label: 'Edit Question', requireUser: true },
        {
          path: 'editcategory', elementId: 'editcategoryview', label: 'Edit Category', requireUser: true,
          children: [
            { path: '/', elementId: 'editcategorylist' },
            { path: 'new', elementId: 'editcategory', requireUser: true },
            { path: 'success', elementId: 'editcategorysuccess' },
            { path: ':id', elementId: 'editcategory' }
          ]
        },
        {
          path: 'editquiz', elementId: 'editquizoutlet', label: 'Edit Quiz', requireUser: true,
          children: [
            { path: '/', elementId: 'editquizlist' },
            { path: 'new', elementId: 'editquiz', requireUser: true },
            { path: 'success', elementId: 'editquizsuccess' },
            { path: ':id', elementId: 'editquiz' }
          ]
        }
      ],
    },
  ],
};

export const JOURNEY_BASIC: IJourney = {

  rootJourney: [
    {
      path: '',
      elementId: 'main',
      children: [
        { path: '/', elementId: 'welcome', label: 'Home', requireUser: false, icon: 'home' }
      ],
    },
  ],
};