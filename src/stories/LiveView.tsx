 import React from 'react';
 import { Header } from './Header';

 type User = {
   name: string;
 };

 export const LiveView: React.FC = () => {
   const [user, setUser] = React.useState<User>();

   return (
     <article className="tw-max-w-4xl tw-mx-auto tw-px-4 tw-py-8">
       <Header
         user={user}
         onLogin={() => setUser({ name: 'Jane Doe' })}
         onLogout={() => setUser(undefined)}
         onCreateAccount={() => setUser({ name: 'Jane Doe' })}
       />

       <section className="tw-mt-8 tw-space-y-4">
         <h2 className="tw-text-2xl tw-font-bold">LiveViews in Storybook</h2>
         <p>
           We recommend building UIs with a{' '}
           <a
             href="https://componentdriven.org"
             target="_blank"
             rel="noopener noreferrer"
             className="tw-text-blue-600 hover:tw-underline"
           >
             <strong>component-driven</strong>
           </a>{' '}
           process starting with atomic components and ending with LiveViews.
         </p>
         <p>
           Render LiveViews with mock data. This makes it easy to build and review LiveView states without
           needing to navigate to them in your app. Here are some handy patterns for managing LiveView
           data in Storybook:
         </p>
         <ul className="tw-list-disc tw-list-inside tw-space-y-1">
           <li>
             Use a higher-level connected component. Storybook helps you compose such data from the
             "args" of child component stories
           </li>
           <li>
             Assemble data in the LiveView component from your services. You can mock these services out
             using Storybook.
           </li>
         </ul>
         <p>
           Get a guided tutorial on component-driven development at{' '}
           <a
             href="https://storybook.js.org/tutorials/"
             target="_blank"
             rel="noopener noreferrer"
             className="tw-text-blue-600 hover:tw-underline"
           >
             Storybook tutorials
           </a>
           . Read more in the{' '}
           <a
             href="https://storybook.js.org/docs"
             target="_blank"
             rel="noopener noreferrer"
             className="tw-text-blue-600 hover:tw-underline"
           >
             docs
           </a>
           .
         </p>
         <div className="tw-p-4 tw-bg-gray-100 tw-rounded tw-flex tw-items-center tw-space-x-2">
           <span className="tw-inline-block tw-bg-blue-600 tw-text-white tw-text-xs tw-font-bold tw-px-2 tw-py-1 tw-rounded">
             Tip
           </span>
           <span>
             Adjust the width of the canvas with the{' '}
             <svg
               className="tw-inline-block tw-align-middle"
               width="10"
               height="10"
               viewBox="0 0 12 12"
               xmlns="http://www.w3.org/2000/svg"
             >
               <g fill="none" fillRule="evenodd">
                 <path
                   d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
                   fill="#999"
                 />
               </g>
             </svg>
             {' '}Viewports addon in the toolbar
           </span>
         </div>
       </section>
     </article>
   );
 };
