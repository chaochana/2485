this.emit(loginEvent, {
    loggedIn: true,
    profile: authResult.idTokenPayload,
    state: authResult.appState || {}
  });