export type IDivider = 'divider'

export interface IRouteParam {
  path: string
  elementId: string
  label?: string
  icon?: string
  params?: { [key: string]: any }
  divider?: boolean
  requireUser?: boolean
  props? : { [key: string]: any }
  title?: string
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
        { path: 'counter', elementId: 'counter', label: 'Counter', title: 'My Counter', requireUser: false },
        { path: 'score', elementId: 'quizscore', title: 'Quiz Score', requireUser: false },
        { path: 'quiz/:session_id', elementId: 'quizsession', requireUser: true },
        {
          path: 'quizzes', elementId: 'quizzesoutlet', label: 'Quizzes', requireUser: false,
          children: [
            {path: '/', elementId: 'listquizzes', props: {apiUri: '/categories/with_quizzes'}},
            {path: ':id', elementId: 'startquiz'}
          ],
        },
        {
          path: 'editquestion', elementId: 'editquestionview', label: 'Edit Question', requireUser: true,
          children: [
            { path: '/', elementId: 'editquestionlist' },
            { path: 'new', elementId: 'editquestion', title: 'Create Question' },
            { path: ':id', elementId: 'editquestion' },
          ],
        },
        {
          path: 'editcategory', elementId: 'editcategoryview', label: 'Edit Category', requireUser: true,
          children: [
            { path: '/', elementId: 'editcategorylist' },
            { path: 'new', elementId: 'editcategory', requireUser: true, title: 'Create Category' },
            { path: 'success', elementId: 'editcategorysuccess' },
            { path: ':id', elementId: 'editcategory' },
          ],
        },
        {
          path: 'editquiz', elementId: 'editquizoutlet', label: 'Edit Quiz', requireUser: true,
          children: [
            { path: '/', elementId: 'editquizlist' },
            { path: 'new', elementId: 'editquiz', requireUser: true },
            { path: 'success', elementId: 'editquizsuccess' },
            { path: ':id', elementId: 'editquiz' },
          ],
        },
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
        { path: '/', elementId: 'welcome', label: 'Home', requireUser: false, icon: 'home' },
      ],
    },
  ],
};
