import React from 'react'
import styled from 'styled-components'

const Back = styled.div`
  position: absolute;
  right: 0;
  top: 8%;
  z-index: -1;
`

const FarmsBRGraphic = () => {
  return (
    <Back>
      <svg width="585" height="352" viewBox="0 0 585 352" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_444_39" maskUnits="userSpaceOnUse" x="0" y="0" width="588" height="352">
          <rect y="352" width="352" height="588" transform="rotate(-90 0 352)" fill="#C4C4C4" />
        </mask>
        <g mask="url(#mask0_444_39)">
          <path d="M796.5 -7.75955C784.559 -16.7721 772.805 -25.9949 760.934 -35.0775C750.506 -43.0627 740.032 -50.9546 729.604 -58.9398C715.941 -69.3766 702.324 -79.8602 688.661 -90.297C682.912 -94.6866 677.163 -99.0995 671.297 -103.349C668.318 -105.497 665.059 -105.38 662.01 -103.326C660.101 -102.041 658.309 -100.594 656.47 -99.1928C652.816 -96.4377 649.185 -93.6826 645.344 -90.8107C632.123 -113.552 619.042 -136.107 605.891 -158.732C606.636 -159.129 607.101 -159.409 607.59 -159.619C612.734 -161.721 617.808 -163.962 623.022 -165.853C628.678 -167.908 630.028 -171.76 629.539 -177.387C629.33 -179.792 628.795 -182.151 628.469 -184.555C627.072 -195.413 625.745 -206.293 624.302 -217.15C622.766 -228.591 621.067 -240.008 619.507 -251.449C617.529 -265.949 615.644 -280.472 613.735 -294.971C612.245 -306.225 610.779 -317.503 609.219 -328.733C608.94 -330.765 608.498 -332.913 607.544 -334.711C605.449 -338.656 600.747 -339.567 595.975 -337.559C586.083 -333.38 576.144 -329.247 566.205 -325.161C556.569 -321.215 546.886 -317.386 537.249 -313.417C520.979 -306.739 504.756 -299.968 488.486 -293.29C476.033 -288.177 463.557 -283.157 451.081 -278.067C448.474 -277.016 446.402 -275.195 446.286 -272.3C446.146 -268.984 446.472 -265.645 446.821 -262.353C447.264 -258.034 447.939 -253.737 448.567 -249.161C447.496 -249.114 446.635 -249.021 445.797 -249.021C428.34 -249.021 410.883 -249.021 393.449 -249.021C386.047 -249.021 378.645 -249.044 371.244 -248.998C369.847 -248.998 369.381 -249.278 369.614 -250.866C370.545 -256.82 371.5 -262.797 372.035 -268.821C372.407 -272.883 371.034 -276.316 366.937 -278.043C361.956 -280.145 356.952 -282.199 351.948 -284.254C337.726 -290.045 323.504 -295.812 309.282 -301.626C293.501 -308.07 277.743 -314.584 261.985 -321.075C248.601 -326.585 235.217 -332.072 221.857 -337.606C215.805 -340.127 210.102 -337.699 209.265 -331.418C208.427 -325.231 207.472 -319.067 206.634 -312.88C205.494 -304.357 204.446 -295.812 203.306 -287.289C202.165 -278.907 200.908 -270.548 199.768 -262.19C198.464 -252.383 197.254 -242.577 195.951 -232.794C194.787 -224.015 193.53 -215.259 192.319 -206.48C190.969 -196.697 189.456 -186.937 188.386 -177.107C187.757 -171.317 189.387 -168.071 194.438 -166.063C199.535 -164.032 204.586 -161.907 209.683 -159.946C211.15 -159.386 211.359 -158.895 210.545 -157.494C204.749 -147.618 199.046 -137.671 193.297 -127.748C189.107 -120.51 184.918 -113.272 180.705 -106.034C177.865 -101.154 174.979 -96.2976 171.999 -91.2543C167.228 -94.8967 162.549 -98.4457 157.871 -101.995C152.773 -105.894 149.701 -105.894 144.557 -101.971C139.762 -98.3289 134.99 -94.6632 130.219 -90.9975C114.437 -78.9029 98.6328 -66.7849 82.8515 -54.6903C71.516 -46.0046 60.1805 -37.3423 48.845 -28.6799C39.7673 -21.722 30.7594 -14.6708 21.5653 -7.8763C16.4678 -4.09382 16.7704 3.1209 21.7748 6.92673C33.2034 15.5891 44.4923 24.4382 55.8977 33.1472C66.209 41.0391 76.5669 48.8609 86.9016 56.7527C96.375 63.9674 105.802 71.2289 115.275 78.467C125.377 86.1954 135.479 93.9238 145.604 101.629C149.189 104.361 153.239 104.337 156.847 101.652C158.685 100.275 160.501 98.8503 162.34 97.4728C165.389 95.1612 168.461 92.8731 171.65 90.4915C184.801 113.14 197.836 135.554 210.894 158.039C210.405 158.343 210.219 158.529 209.986 158.623C204.935 160.748 199.931 162.989 194.81 164.904C189.596 166.865 187.897 170.671 188.386 175.551C189.107 182.835 190.271 190.073 191.249 197.312C192.575 207.095 193.902 216.878 195.229 226.661C196.23 234.039 197.254 241.417 198.232 248.819C199.535 258.532 200.839 268.268 202.142 277.981C203.003 284.495 203.864 291.01 204.726 297.547C205.913 306.607 207.03 315.689 208.31 324.748C208.706 327.597 209.008 330.632 210.242 333.154C212.593 337.917 217.388 338.407 222.928 336.189C226.303 334.835 229.608 333.224 232.96 331.846C242.084 328.087 251.255 324.422 260.402 320.662C274.182 315.035 287.938 309.362 301.694 303.711C312.262 299.368 322.852 295.049 333.42 290.729C344.313 286.27 355.113 281.6 366.123 277.421C370.825 275.646 372.198 272.167 372.058 268.431C371.942 265.046 371.127 261.66 370.685 258.275C370.289 255.263 369.94 252.228 369.568 249.122C395.986 249.122 422.032 249.122 448.474 249.122C447.613 255.45 446.868 261.497 445.937 267.544C445.378 271.163 447.24 275.6 450.243 276.837C457.366 279.756 464.535 282.581 471.68 285.499C484.133 290.566 496.609 295.679 509.062 300.769C523.074 306.513 537.086 312.28 551.099 318.047C563.668 323.207 576.237 328.391 588.829 333.528C592.065 334.858 595.324 336.166 598.675 337.17C602.888 338.431 607.8 335.629 608.498 331.169C609.312 325.939 610.197 320.709 610.895 315.456C612.362 304.669 613.688 293.858 615.108 283.048C616.249 274.409 617.506 265.77 618.67 257.131C619.95 247.675 621.137 238.195 622.417 228.739C623.418 221.291 624.535 213.866 625.536 206.418C626.909 196.284 628.329 186.174 629.563 176.041C630.145 171.184 628.702 167.449 624.372 165.394C623.162 164.81 621.882 164.343 620.625 163.83C615.946 161.915 611.244 160 606.333 157.992C619.531 135.274 632.635 112.743 645.763 90.1413C646.205 90.3981 646.508 90.5149 646.764 90.725C651.442 94.2973 656.098 97.893 660.799 101.442C664.733 104.431 668.644 104.454 672.531 101.489C685.658 91.4722 698.74 81.4089 711.844 71.369C722.109 63.5238 732.397 55.7254 742.685 47.8802C754.882 38.5641 767.079 29.2247 779.275 19.8852C785.025 15.4723 790.75 11.0361 796.476 6.62319C801.271 2.9808 801.341 -4.11716 796.5 -7.75955Z" fill="#F2F2F2" />
          <path d="M539.281 -168.723C529.263 -186.02 510.768 -196.673 490.756 -196.673L328.343 -196.673C308.307 -196.673 289.835 -186.02 279.817 -168.723L198.599 -28.4851C188.581 -11.1885 188.581 10.0944 198.599 27.3677L279.817 167.606C289.835 184.903 308.33 195.556 328.343 195.556L490.756 195.556C510.792 195.556 529.263 184.903 539.281 167.606L620.499 27.3677C630.517 10.0944 630.517 -11.2118 620.499 -28.4851L539.281 -168.723Z" fill="white" />
          <path d="M510.525 -132.319C502.696 -145.873 488.202 -154.21 472.544 -154.21L345.437 -154.21C329.755 -154.21 315.285 -145.849 307.456 -132.319L243.891 -22.449C236.062 -8.89565 236.062 7.77819 243.891 21.3315L307.456 131.202C315.285 144.755 329.779 153.092 345.437 153.092L472.544 153.092C488.226 153.092 502.696 144.732 510.525 131.202L574.09 21.3315C581.919 7.77819 581.919 -8.89565 574.09 -22.449L510.525 -132.319Z" fill="#F2F2F2" />
        </g>
      </svg>
    </Back>
  )
}

export default FarmsBRGraphic