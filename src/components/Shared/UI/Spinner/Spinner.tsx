import classes from './Spinner.module.scss'

const Spinner = () => {
   return (
      <div className={classes['Spinner-wrapper']}>
         <svg 
            className={classes['Spinner']} 
            viewBox="0 0 128 128" 
            width="128px" 
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
         >
            <defs>
               <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#000" />
                  <stop offset="100%" stopColor="#fff" />
               </linearGradient>
               <mask id="mask1">
                  <rect x="0" y="0" width="128" height="128" fill="url(#grad1)" />
               </mask>
            </defs>
            <g fill="none" strokeLinecap="round" strokeWidth="16">
               <circle className={classes['Spinner-ring']} r="56" cx="64" cy="64" stroke="#ddd" />
               <g stroke="#ffc107">
                  <polyline className={classes['Spinner-fallLine']} points="64,8 64,120" />
                  <polyline className={[classes['Spinner-fallLine'], classes['Spinner-fallLine--delay1'] ].join(' ')} points="64,8 64,120" />
                  <polyline className={[classes['Spinner-fallLine'], classes['Spinner-fallLine--delay2'] ].join(' ')} points="64,8 64,120" />
                  <polyline className={[classes['Spinner-fallLine'], classes['Spinner-fallLine--delay3'] ].join(' ')} points="64,8 64,120" />
                  <polyline className={[classes['Spinner-fallLine'], classes['Spinner-fallLine--delay4'] ].join(' ')} points="64,8 64,120" />
                  <circle className={classes['Spinner-drops']} r="56" cx="64" cy="64" transform="rotate(90,64,64)" />
                  <circle className={classes['Spinner-worm']} r="56" cx="64" cy="64" transform="rotate(-90,64,64)" />
               </g>
               <g stroke="red" mask="url(#mask1)">
                  <polyline className={classes['Spinner-fallLine']} points="64,8 64,120" />
                  <polyline className={[classes['Spinner-fallLine'], classes['Spinner-fallLine--delay1'] ].join(' ')} points="64,8 64,120" />
                  <polyline className={[classes['Spinner-fallLine'], classes['Spinner-fallLine--delay2'] ].join(' ')} points="64,8 64,120" />
                  <polyline className={[classes['Spinner-fallLine'], classes['Spinner-fallLine--delay3'] ].join(' ')} points="64,8 64,120" />
                  <polyline className={[classes['Spinner-fallLine'], classes['Spinner-fallLine--delay4'] ].join(' ')} points="64,8 64,120" />
                  <circle className={classes['Spinner-drops']} r="56" cx="64" cy="64" transform="rotate(90,64,64)" />
                  <circle className={classes['Spinner-worm']} r="56" cx="64" cy="64" transform="rotate(-90,64,64)" />
               </g>
            </g>
         </svg>
      </div>
   )
}

export default Spinner