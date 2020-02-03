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
            "questionBlocks": [
                {
                    "type": "paragraph",
                    "data": {
                        "text": "駄目だ。大問題だ。"
                    }
                },
                {
                    "type": "code",
                    "data": {
                        "code": "long t1 = System.currentTimeMillis();\nlong t2 = System.currentTimeMillis();\nSystem.out.println(t2-t1);\n"
                    }
                },
                {
                    "type": "paragraph",
                    "data": {
                        "text": "結果はなんとでるか？ 99.9%以上の確率で0が表示される。そもそも<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">System.currentTimeMillis()</a>は時刻をミリ秒で返す。1行のプログラムを実行するのに1ミリ秒もかかってたら、たかだか1000行分動いただけで1秒かかってしまう。今のコンピュータはそんなに遅くない。"
                    }
                },
                {
                    "type": "paragraph",
                    "data": {
                        "text": "そもそもドキュメントをちゃんと読むと"
                    }
                },
                {
                    "type": "paragraph",
                    "data": {
                        "text": "ミリ秒で表される現在の時間を返します。戻り値の時間単位はミリ秒ですが、値の粒度は基本となる<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>によって異なり、単位がより大きくなる場合があります。たとえば、多くの<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>では、時間を 10 ミリ秒の単位で計測します。"
                    }
                },
                {
                    "type": "paragraph",
                    "data": {
                        "text": "<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">Oracle Technology Network for Java Developers | Oracle Technology Network | Oracle</a>"
                    }
                },
                {
                    "type": "paragraph",
                    "data": {
                        "text": "と、OSによって変わることと、その多くが10m秒程度の単位で計測することが書かれている。これじゃろくに測定できない。"
                    }
                },
                {
                    "type": "paragraph",
                    "data": {
                        "text": "そこで<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#nanoTime()\">System.nanoTime()</a>の登場である。Java5から使えるこのメソッドは"
                    }
                }
            ],
            "type": "select",
            "answer": [
                {
                    "text": "react",
                    "answer": true,
                    "error": {
                        "status": "",
                        "message": ""
                    }
                },
                {
                    "text": "java",
                    "answer": false,
                    "error": {
                        "status": "",
                        "message": ""
                    }
                },
                {
                    "text": "python",
                    "answer": false,
                    "error": {
                        "status": "",
                        "message": ""
                    }
                },
                {
                    "text": "ruby",
                    "answer": false,
                    "error": {
                        "status": "",
                        "message": ""
                    }
                },
                {
                    "text": "scala",
                    "answer": false,
                    "error": {
                        "status": "",
                        "message": ""
                    }
                }
            ],
            "explanations": [
                {
                    "references": [
                        {
                            "id": "70b7b865-0b73-312a-a73f-dbdfda3da2da",
                            "type": "header",
                            "data": {
                                "text": "Editor.js",
                                "level": 2
                            },
                            "idx": 1,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "18b7a40e-150c-e860-f9ac-92d014b6773d",
                            "type": "paragraph",
                            "data": {
                                "text": "ho"
                            },
                            "idx": 2,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "ccb7b865-0b7c-cf56-af09-004cf8dd3638",
                            "type": "paragraph",
                            "data": {
                                "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
                            },
                            "idx": 3,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93",
                            "type": "header",
                            "data": {
                                "text": "Key features",
                                "level": 3
                            },
                            "idx": 4,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "3eb7b865-0b92-c2fb-a175-ca140c4679d6",
                            "type": "list",
                            "data": {
                                "style": "ordered",
                                "items": [
                                    "It is a block-styled editor",
                                    "It returns clean data output in JSON",
                                    "Designed to be extendable and pluggable with a simple API"
                                ]
                            },
                            "idx": 5,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        }
                    ],
                    "blocks": [
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "駄目だ。大問題だ。"
                            }
                        },
                        {
                            "type": "code",
                            "data": {
                                "code": "long t1 = System.currentTimeMillis();\nlong t2 = System.currentTimeMillis();\nSystem.out.println(t2-t1);\n"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "結果はなんとでるか？ 99.9%以上の確率で0が表示される。そもそも<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">System.currentTimeMillis()</a>は時刻をミリ秒で返す。1行のプログラムを実行するのに1ミリ秒もかかってたら、たかだか1000行分動いただけで1秒かかってしまう。今のコンピュータはそんなに遅くない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そもそもドキュメントをちゃんと読むと"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "ミリ秒で表される現在の時間を返します。戻り値の時間単位はミリ秒ですが、値の粒度は基本となる<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>によって異なり、単位がより大きくなる場合があります。たとえば、多くの<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>では、時間を 10 ミリ秒の単位で計測します。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">Oracle Technology Network for Java Developers | Oracle Technology Network | Oracle</a>"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "と、OSによって変わることと、その多くが10m秒程度の単位で計測することが書かれている。これじゃろくに測定できない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そこで<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#nanoTime()\">System.nanoTime()</a>の登場である。Java5から使えるこのメソッドは"
                            }
                        }
                    ]
                },
                {
                    "references": [
                        {
                            "id": "eeb7b865-0b9d-52f4-358e-e384d1de5e39",
                            "type": "header",
                            "data": {
                                "text": "What does it mean «block-styled editor»",
                                "level": 3
                            },
                            "idx": 6,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "08b7b865-0bab-e931-9066-755fdc215938",
                            "type": "paragraph",
                            "data": {
                                "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
                            },
                            "idx": 7,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "5eb7b865-0bb7-dd68-1f5a-1cea45ced78d",
                            "type": "paragraph",
                            "data": {
                                "text": "There are dozens of&nbsp;<a href=\"https://github.com/editor-js\">ready-to-use Blocks</a>&nbsp;and the&nbsp;<a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a>&nbsp;for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
                            },
                            "idx": 8,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "fab7b865-0bc2-7180-7f53-d62f9b9ca268",
                            "type": "header",
                            "data": {
                                "text": "What does it mean clean data output",
                                "level": 3
                            },
                            "idx": 9,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "eeb7b865-0bcc-31e1-3173-4ec591709186",
                            "type": "paragraph",
                            "data": {
                                "text": "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
                            },
                            "idx": 10,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        }
                    ],
                    "blocks": [
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "駄目だ。大問題だ。"
                            }
                        },
                        {
                            "type": "code",
                            "data": {
                                "code": "long t1 = System.currentTimeMillis();\nlong t2 = System.currentTimeMillis();\nSystem.out.println(t2-t1);\n"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "結果はなんとでるか？ 99.9%以上の確率で0が表示される。そもそも<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">System.currentTimeMillis()</a>は時刻をミリ秒で返す。1行のプログラムを実行するのに1ミリ秒もかかってたら、たかだか1000行分動いただけで1秒かかってしまう。今のコンピュータはそんなに遅くない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そもそもドキュメントをちゃんと読むと"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "ミリ秒で表される現在の時間を返します。戻り値の時間単位はミリ秒ですが、値の粒度は基本となる<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>によって異なり、単位がより大きくなる場合があります。たとえば、多くの<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>では、時間を 10 ミリ秒の単位で計測します。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">Oracle Technology Network for Java Developers | Oracle Technology Network | Oracle</a>"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "と、OSによって変わることと、その多くが10m秒程度の単位で計測することが書かれている。これじゃろくに測定できない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そこで<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#nanoTime()\">System.nanoTime()</a>の登場である。Java5から使えるこのメソッドは"
                            }
                        }
                    ]
                },
                {
                    "references": [
                        {
                            "id": "fab7b865-0bc2-7180-7f53-d62f9b9ca268",
                            "type": "header",
                            "data": {
                                "text": "What does it mean clean data output",
                                "level": 3
                            },
                            "idx": 9,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "eeb7b865-0bcc-31e1-3173-4ec591709186",
                            "type": "paragraph",
                            "data": {
                                "text": "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below"
                            },
                            "idx": 10,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "34b7b865-0bd7-b84c-58cb-08eac72a1331",
                            "type": "paragraph",
                            "data": {
                                "text": "Given data can be used as you want: render with HTML for Web clients, render natively for mobile apps, create markup for Facebook Instant Articles or Google AMP, generate an audio version and so on."
                            },
                            "idx": 11,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "a8b7b865-0be2-2755-4058-a5c26bc40c1c",
                            "type": "paragraph",
                            "data": {
                                "text": "Clean data is useful to sanitize, validate and process on the backend."
                            },
                            "idx": 12,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "9ab7b865-0bec-fa92-0c5a-fc1c4d32d69d",
                            "type": "paragraph",
                            "data": {
                                "text": "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
                            },
                            "idx": 13,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        }
                    ],
                    "blocks": [
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "駄目だ。大問題だ。"
                            }
                        },
                        {
                            "type": "code",
                            "data": {
                                "code": "long t1 = System.currentTimeMillis();\nlong t2 = System.currentTimeMillis();\nSystem.out.println(t2-t1);\n"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "結果はなんとでるか？ 99.9%以上の確率で0が表示される。そもそも<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">System.currentTimeMillis()</a>は時刻をミリ秒で返す。1行のプログラムを実行するのに1ミリ秒もかかってたら、たかだか1000行分動いただけで1秒かかってしまう。今のコンピュータはそんなに遅くない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そもそもドキュメントをちゃんと読むと"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "ミリ秒で表される現在の時間を返します。戻り値の時間単位はミリ秒ですが、値の粒度は基本となる<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>によって異なり、単位がより大きくなる場合があります。たとえば、多くの<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>では、時間を 10 ミリ秒の単位で計測します。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">Oracle Technology Network for Java Developers | Oracle Technology Network | Oracle</a>"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "と、OSによって変わることと、その多くが10m秒程度の単位で計測することが書かれている。これじゃろくに測定できない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そこで<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#nanoTime()\">System.nanoTime()</a>の登場である。Java5から使えるこのメソッドは"
                            }
                        }
                    ]
                },
                {
                    "references": [
                        {
                            "id": "84b7b865-0bf6-093b-028c-ade9fbdf87f6",
                            "type": "imageUrl",
                            "data": {
                                "url": "https://capella.pics/6d8f1a84-9544-4afa-b806-5167d45baf7c.jpg",
                                "caption": "",
                                "withBorder": false,
                                "withBackground": false,
                                "stretched": false
                            },
                            "idx": 14,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "82b7b865-0bff-59d0-40d7-f340bb1094dd",
                            "type": "paragraph",
                            "data": {
                                "text": "Select an Image"
                            },
                            "idx": 15,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "9ab7b865-0bec-fa92-0c5a-fc1c4d32d69d",
                            "type": "paragraph",
                            "data": {
                                "text": "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏"
                            },
                            "idx": 13,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "a8b7b865-0be2-2755-4058-a5c26bc40c1c",
                            "type": "paragraph",
                            "data": {
                                "text": "Clean data is useful to sanitize, validate and process on the backend."
                            },
                            "idx": 12,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "34b7b865-0bd7-b84c-58cb-08eac72a1331",
                            "type": "paragraph",
                            "data": {
                                "text": "Given data can be used as you want: render with HTML for Web clients, render natively for mobile apps, create markup for Facebook Instant Articles or Google AMP, generate an audio version and so on."
                            },
                            "idx": 11,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        }
                    ],
                    "blocks": [
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "駄目だ。大問題だ。"
                            }
                        },
                        {
                            "type": "code",
                            "data": {
                                "code": "long t1 = System.currentTimeMillis();\nlong t2 = System.currentTimeMillis();\nSystem.out.println(t2-t1);\n"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "結果はなんとでるか？ 99.9%以上の確率で0が表示される。そもそも<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">System.currentTimeMillis()</a>は時刻をミリ秒で返す。1行のプログラムを実行するのに1ミリ秒もかかってたら、たかだか1000行分動いただけで1秒かかってしまう。今のコンピュータはそんなに遅くない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そもそもドキュメントをちゃんと読むと"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "ミリ秒で表される現在の時間を返します。戻り値の時間単位はミリ秒ですが、値の粒度は基本となる<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>によって異なり、単位がより大きくなる場合があります。たとえば、多くの<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>では、時間を 10 ミリ秒の単位で計測します。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">Oracle Technology Network for Java Developers | Oracle Technology Network | Oracle</a>"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "と、OSによって変わることと、その多くが10m秒程度の単位で計測することが書かれている。これじゃろくに測定できない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そこで<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#nanoTime()\">System.nanoTime()</a>の登場である。Java5から使えるこのメソッドは"
                            }
                        }
                    ]
                },
                {
                    "references": [
                        {
                            "id": "e4b7b865-0b86-2f02-cd5d-bd3c4d9c9b93",
                            "type": "header",
                            "data": {
                                "text": "Key features",
                                "level": 3
                            },
                            "idx": 4,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "3eb7b865-0b92-c2fb-a175-ca140c4679d6",
                            "type": "list",
                            "data": {
                                "style": "ordered",
                                "items": [
                                    "It is a block-styled editor",
                                    "It returns clean data output in JSON",
                                    "Designed to be extendable and pluggable with a simple API"
                                ]
                            },
                            "idx": 5,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "eeb7b865-0b9d-52f4-358e-e384d1de5e39",
                            "type": "header",
                            "data": {
                                "text": "What does it mean «block-styled editor»",
                                "level": 3
                            },
                            "idx": 6,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "08b7b865-0bab-e931-9066-755fdc215938",
                            "type": "paragraph",
                            "data": {
                                "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
                            },
                            "idx": 7,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        },
                        {
                            "id": "5eb7b865-0bb7-dd68-1f5a-1cea45ced78d",
                            "type": "paragraph",
                            "data": {
                                "text": "There are dozens of&nbsp;<a href=\"https://github.com/editor-js\">ready-to-use Blocks</a>&nbsp;and the&nbsp;<a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a>&nbsp;for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
                            },
                            "idx": 8,
                            "articleId": "98b7a40e-14d7-31b2-37e2-be216715a884",
                            "articleTitle": "facebook JS"
                        }
                    ],
                    "blocks": [
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "駄目だ。大問題だ。"
                            }
                        },
                        {
                            "type": "code",
                            "data": {
                                "code": "long t1 = System.currentTimeMillis();\nlong t2 = System.currentTimeMillis();\nSystem.out.println(t2-t1);\n"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "結果はなんとでるか？ 99.9%以上の確率で0が表示される。そもそも<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">System.currentTimeMillis()</a>は時刻をミリ秒で返す。1行のプログラムを実行するのに1ミリ秒もかかってたら、たかだか1000行分動いただけで1秒かかってしまう。今のコンピュータはそんなに遅くない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そもそもドキュメントをちゃんと読むと"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "ミリ秒で表される現在の時間を返します。戻り値の時間単位はミリ秒ですが、値の粒度は基本となる<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>によって異なり、単位がより大きくなる場合があります。たとえば、多くの<a href=\"http://d.hatena.ne.jp/keyword/%A5%AA%A5%DA%A5%EC%A1%BC%A5%C6%A5%A3%A5%F3%A5%B0%A5%B7%A5%B9%A5%C6%A5%E0\">オペレーティングシステム</a>では、時間を 10 ミリ秒の単位で計測します。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#currentTimeMillis()\">Oracle Technology Network for Java Developers | Oracle Technology Network | Oracle</a>"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "と、OSによって変わることと、その多くが10m秒程度の単位で計測することが書かれている。これじゃろくに測定できない。"
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "そこで<a href=\"http://java.sun.com/javase/ja/6/docs/ja/api/java/lang/System.html#nanoTime()\">System.nanoTime()</a>の登場である。Java5から使えるこのメソッドは"
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