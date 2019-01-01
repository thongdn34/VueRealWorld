import {
  articleService,
  commentService
} from "../config/service";
import {
  FETCH_ARTICLE,
  FETCH_COMMENTS
} from "./actionType";
import {
  SET_ARTICLE,
  SET_COMMENTS
} from "./mutationType";

const state = {
  article: {},
  comments: []
};

const mutations = {
  [SET_ARTICLE](state, article) {
    state.article = article;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  }
};

const actions = {
  [FETCH_ARTICLE](context, articleSlug) {
    return articleService.get(articleSlug)
      .then(({
        data
      }) => {
        context.commit(SET_ARTICLE, data.article);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_COMMENTS](context, articleSlug) {
    return commentService.get(articleSlug)
      .then(({
        data
      }) => {
        context.commit(SET_COMMENTS, data.comments);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

const mutations = {
  [SET_ARTICLE](state, article) {
    state.article = article;
  },
  [SET_COMMENTS](state, comments) {
    state.comments = comments;
  }
}

export default {
  state,
  actions,
  mutations
}