import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ArticleList from './components/ArticleList/ArticleList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div id="app">
        <Header />
        <ArticleList />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
