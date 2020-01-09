const SUFFIX = '_TEST_QUESTIONS_EDIT';
const SET_QUESTIONS = 'SET_QUESTIONS' + SUFFIX;
const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS' + SUFFIX;
const ADD_QUESTION = 'ADD_QUESTION' + SUFFIX;
const UPDATE_QUESTION = 'UPDATE_QUESTION' + SUFFIX;
const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS' + SUFFIX;
const REMOVE_QUESTION = 'REMOVE_QUESTION' + SUFFIX;

export const setQuestions = (questions) => ({
    type: SET_QUESTIONS,
    questions: questions
})

export const clearQuestions = () => ({
    type: CLEAR_QUESTIONS,
})

export const addQuestion = (question) => ({
    type: ADD_QUESTION,
    question: question
})

export const updateQuestion = (question, idx) => ({
    type: UPDATE_QUESTION,
    question: question,
    idx: idx,
})

export const updateQuestions = (questions) => ({
    type: UPDATE_QUESTIONS,
    questions: questions
})

export const removeQuestion = (idx) => ({
    type: REMOVE_QUESTION,
    idx: idx
})

const initialState = {
    questions: [
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        }, {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },

        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
        {
            questionBlocks: [
                {
                    type: 'paragraph',
                    data: {
                        text: 'j'
                    }
                }
            ],
            type: 'text',
            answer: {
                text: 'j',
                showCount: false,
                error: {
                    status: '',
                    message: ''
                }
            },
            explanations: [
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                },
                {
                    references: [
                        {
                            id: 'e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93',
                            type: 'header',
                            data: {
                                text: 'Key features',
                                level: 3
                            },
                            idx: 4,
                            articleId: '98b7a40e-14d7-31b2-37e2-be216715a884',
                            articleTitle: 'facebook JS'
                        }
                    ],
                    blocks: [
                        {
                            type: 'paragraph',
                            data: {
                                text: 'j'
                            }
                        }
                    ]
                }
            ]
        },
    ],
    error: {
        title: { status: "", message: "" },
        description: { status: "", message: "" },
        referenceCourse: { status: "", message: "" },
    },
}

export default function TestEditQuestions(state = initialState, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
            };
        case CLEAR_QUESTIONS:
            return {
                ...initialState
            };
        case ADD_QUESTION:
            const addedQuestions = state.questions.concat();
            addedQuestions.push(action.question);
            return {
                ...state,
                questions: addedQuestions,
            };
        case UPDATE_QUESTION:
            const updatedQuestions = state.questions.concat();
            updatedQuestions[action.idx] = action.question;
            return {
                ...state,
                questions: updatedQuestions,
            };
        case UPDATE_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
            };
        case REMOVE_QUESTION:
            const deletedQuestions = state.questions.concat();
            deletedQuestions.splice(action.idx, 1);

            return {
                ...state,
                questions: deletedQuestions,
            };
        default:
            return state;
    }
}