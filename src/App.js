import React, { Suspense } from "react";
import { Box, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "./routes";
import Download from "./pages/download/download"
import theme from "./theme/theme";

const App = () => {
  return (
    <Box>
      {/* <Router>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            {routes.map((item, i) => (
              <Route key={i} exact path={item.path} component={item.component} />
            ))}
          </Switch>
        </Suspense>
      </Router> */}
      <MuiThemeProvider theme={theme}>
      <Download/>
      </MuiThemeProvider>
    </Box>
  );
};

export default App;
