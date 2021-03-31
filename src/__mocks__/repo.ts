import { Issue } from '../redux/repo/reducer';

export const repoIssuesMock = {
  data: [
    {
      html_url: 'https://github.com/meliorence/react-native-render-html/issues/156',

      node_id: 'MDU6SXNzdWUzMjYwODI3Mzc=',
      number: 156,
      title: 'Empty line in output, even if there is no <br> or other Tag to parse',
      user: {
        login: 'xstable',
      },
      labels: [
        {
          id: 490889432,
          name: 'bug',
          color: 'ee0701',
        },
        {
          id: 957368524,
          name: 'bug:minor',
          color: 'd93f0b',
        },
      ],
      state: 'open',
      comments: 3,
    },
    {
      html_url: 'https://github.com/meliorence/react-native-render-html/issues/152',
      node_id: 'MDU6SXNzdWUzMjQ2MDYyNTI=',
      number: 152,
      title: 'How to deal with the long rendering time when the HTML string is very long',
      user: {
        login: 'junchenjun',
      },
      labels: [
        {
          id: 490889434,
          name: 'enhancement',
          color: '84b6eb',
        },
        {
          id: 490889435,
          name: 'is:help wanted',
          color: '128A0C',
        },
        {
          id: 490889437,
          name: 'question',
          color: 'cc317c',
        },
      ],
      state: 'open',
      comments: 14,
    },
  ] as Array<Issue>,
};
