export const MessageVideo = {
  namePublication:{
    stringPublication: 'The "namePublication" is not valid. Type string',
    lengthPublication: 'The "namePublication" is not valid. Min length 20, max length 50'
  },
  linkVideo: 'The "linkVideo" is not valid. Invalid link to the page with the video for the service "YouTube"',
  setTag:{
    lengthArrayWithTags: 'The "setTag" is not valid. The max number of tags in the array is eight',
    lengthTag: 'The "setTag" is not valid. Min length 3, max length 10',
    gapTag: 'The "setTag" is not valid. Tag does not contain a space'
  },
  state: 'The "state" is not valid. The field value can be "Черновик", "Опубликована"'
} as const;

export const MessageText = {
  namePublication:{
    stringPublication: 'The "namePublication" is not valid. Type string',
    lengthPublication: 'The "namePublication" is not valid. Min length 20, max length 50'
  },
  announcementPublication:{
    stringAnnouncement: 'The "announcementPublication" is not valid. Type string',
    lengthAnnouncement: 'The "announcementPublication" is not valid. Min length 50, max length 255'
  },
  textPublication:{
    stringText: 'The "textPublication" is not valid. Type string',
    lengthText: 'The "textPublication" is not valid. Min length 50, max length 255'
  },
  setTag:{
    lengthArrayWithTags: 'The "setTag" is not valid. The max number of tags in the array is eight',
    lengthTag: 'The "setTag" is not valid. Min length 3, max length 10',
    gapTag: 'The "setTag" is not valid. Tag does not contain a space'
  },
  state: 'The "state" is not valid. The field value can be "Черновик", "Опубликована"'
} as const;

export const MessageQuote = {
  textQuote:{
    stringQuote: 'The "textQuote" is not valid. Type string',
    lengthQuote: 'The "textQuote" is not valid. Min length 20, max length 300'
  },
  setTag:{
    lengthArrayWithTags: 'The "setTag" is not valid. The max number of tags in the array is eight',
    lengthTag: 'The "setTag" is not valid. Min length 3, max length 10',
    gapTag: 'The "setTag" is not valid. Tag does not contain a space'
  },
  state: 'The "state" is not valid. The field value can be "Черновик", "Опубликована"'
} as const;

export const MessagePhoto = {
  photo:{
    stringPhoto: 'The "photo" is not valid. Type string',
    formatsPhoto: 'The "photo" is not valid. Allowed formats: jpg, png'
  },
  setTag:{
    lengthArrayWithTags: 'The "setTag" is not valid. The max number of tags in the array is eight',
    lengthTag: 'The "setTag" is not valid. Min length 3, max length 10',
    gapTag: 'The "setTag" is not valid. Tag does not contain a space'
  },
  state: 'The "state" is not valid. The field value can be "Черновик", "Опубликована"'
} as const;

export const MessageLink = {
  link: 'The "link" is not valid. Valid URL',
  description: {
    stringLink: 'The "description" is not valid. Type string',
    lengthLink: 'The "description" is not valid. Max length 300'
  },
  setTag:{
    lengthArrayWithTags: 'The "setTag" is not valid. The max number of tags in the array is eight',
    lengthTag: 'The "setTag" is not valid. Min length 3, max length 10',
    gapTag: 'The "setTag" is not valid. Tag does not contain a space'
  },
  state: 'The "state" is not valid. The field value can be "Черновик", "Опубликована"'
} as const;

export const MessageComment = {
  text:{
    stringComment: 'The "text" is not valid. Type string',
    lengthComment: 'The "text" is not valid. Min length 10, max length 300'
  },
  idVideo: 'The "idVideo" is not valid. Type number',
  idText: 'The "idText" is not valid. Type number',
  idQuote: 'The "idQuote" is not valid. Type number',
  idPhoto: 'The "idPhoto" is not valid. Type number',
  idLink: 'The "idLink" is not valid. Type number',
  idPost: 'The "idPost" is not valid. Type number'
} as const;

export const MessageSearch = {
  stringSearch: 'The "word" is not valid. Type string'
} as const;

export const MessageRegistration = {
  incorrectEmail: 'The "email" is not valid. Incorrect email',
  firstName: {
    stringFirstName: 'The "firstName" is not valid. Type string',
    lengthFirstName: 'The "firstName" is not valid. Min length 3, max length 50'
  },
  incorrectPassword: 'The "password" is not valid. Min length 6, max length 12',
  incorrectAvatar: {
    stringAvatar: 'The "avatar" is not valid. Type string',
    formatsAvatar: 'The "avatar" is not valid. Allowed formats: jpeg, png'
  },
  incorrectNewPassword: 'The "newPassword" is not valid. Min length 6, max length 12'
} as const;
