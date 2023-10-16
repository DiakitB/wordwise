/// Optimizing Bundle Size witd Code Splitting

// we dynimically import components but most the time we do it pages  by using lazy()
// we use 3 steps to Optimize Bundle

//1) Exp: const Homepage = lazy(()=> import('./pages/HomePage))
// 2) then we use Suspense_API Suspense({falback prop}) inside our BrowserRouter
