import Vue from 'vue';
import apiService, {
  articleService,
  commentService,
  favoriteService
} from "../config/service";

import {
  FETCH_ARTICLE,
  FETCH_COMMENTS,
  COMMENT_CREATE,
  COMMENT_DESTROY,
  FAVORITE_ADD,
  FAVORITE_REMOVE,
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_DELETE,
  ARTICLE_RESET_STATE,
} from "./actionType";

import {
  RESET_STATE,
  SET_ARTICLE,
  SET_COMMENTS,
  TAG_ADD,
  TAG_REMOVE,
  UPDATE_ARTICLE_IN_LIST
} from "./mutationType";

const initialState = {
  article: {
    author: {},
    title: "",
    description: "",
    body: "",
    tagList: []
  },
  comments: []
};

export const state = { ...initialState
};

const getters = {
  article(state) {
    return state.article;
  },
  comments(state) {
    return state.comments
  }
};

const actions = {
  async [FETCH_ARTICLE](context, articleSlug, prevArticle) {
    if (prevArticle !== undefined) {
      return context.commit(SET_ARTICLE, prevArticle);
    }
    const {
      data
    } = await apiService.get('articles', articleSlug);
    context.commit(SET_ARTICLE, data.article);
    return data;
  },
  async [FETCH_COMMENTS](context, articleSlug) {
    const {
      data
    } = await commentService.get(articleSlug);
    context.commit(SET_COMMENTS, data.comments);
    return data.comments;
  },
  async [COMMENT_CREATE](context, payload) {
    await commentService.post(payload.slug, payload.comment);
    context.dispatch(FETCH_COMMENTS, payload.slug);
  },
  async [COMMENT_DESTROY](context, payload) {
    await commentService.remove(payload.slug, payload.commentId);
    context.dispatch(FETCH_COMMENTS, payload.slug)
  },
  async [FAVORITE_ADD](context, payload) {
    const {
      data
    } = await favoriteService.add(payload);
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, {
      root: true
    });
    context.commit(SET_ARTICLE, data.article);
  },
  async [FAVORITE_REMOVE](context, payload) {
    const {
      data
    } = await favoriteService.remove(payload);
    context.commit(UPDATE_ARTICLE_IN_LIST, data.article, {
      root: true
    });
    context.commit(SET_ARTICLE, data.article);
  },
  [ARTICLE_PUBLISH]({
    state
  }) {
    return articleService.create(state.article);
  },
  [ARTICLE_DELETE](slug) {
    return articleService.delete(slug);
  },
  [ARTICLE_EDIT]({
    state
  }) {
    return articleService.update(state.article.slug, state.article);
  },
  [ARTICLE_EDIT_ADD_TAG](context, tag) {
    context.commit(TAG_ADD, tag);
  },
  [ARTICLE_EDIT_REMOVE_TAG](context, tag) {
    context.commit(TAG_REMOVE, tag);
  },
  [ARTICLE_RESET_STATE]({
    commit
  }) {
    commit(RESET_STATE);
  }
};

const mutations = {
  [SET_ARTICLE](state, article) {
    state.article = article;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  },
  [TAG_ADD](state, tag) {
    state.article.tagList = state.article.tagList.concat([tag]);
  },
  [TAG_REMOVE](state, tag) {
    state.article.tagList = state.article.tagList.filter(tg => tg !== tag);
  },
  [RESET_STATE]() {
    for (const key in state) {
      Vue.set(state, key, initialState[key]);
    }
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};