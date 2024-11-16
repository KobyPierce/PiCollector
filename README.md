# PiCollector

**Helping developers effortlessly collect and refine training data for self-driving applications.**

## Overview
PiCollector is a modern and intuitive data collection platform designed to streamline the process of gathering synchronized image and steering angle data for machine learning applications, particularly for self-driving RC cars. This project aims to simplify the data collection process, making it accessible even for non-technical users.

The application runs headlessly on a Raspberry Pi, providing a sleek web interface accessible via a phone or laptop on the local network. Users can configure camera setups, connect gyroscopic devices (e.g., smartphones), and collect labeled data efficiently at customizable frame rates. 

## Current Status
This project has progressed significantly and is now in the **active development phase**. The following milestones have been achieved so far:
- Fully functioning mock API with endpoints for testing data collection and session management.
- QR code tracking implemented for accurate steering angle measurement on the "Collect Data" page.
- Live data collection preview with synchronized camera streams and steering angle tracking.
- Responsive and modern UI/UX design, including a dynamic sidebar and mobile-friendly layout.
- "Calibrate Zero" feature for resetting the cumulative steering rotation.
- Session management framework for viewing and editing recorded data.

The next steps include:
- Finalizing the integration of collected steering and image data into the API.
- Preparing the project for deployment on Raspberry Pi hardware.
- Refining the session review and editing tools.
- Adding advanced configuration options for cameras and frame rates.

Stay tuned as the project continues to evolve with more features and enhancements!

## Vision
The ultimate goal of PiCollector is to provide a versatile and user-friendly tool for developers and hobbyists to collect high-quality training data for machine learning models. The project is being built to support individual needs and has the potential to grow into a broader solution for similar use cases.

## Contributing
While the project is not yet ready for public contributions, feedback and suggestions are welcome to help shape its development. Stay tuned for updates as the prototype evolves!

## License
This project is licensed under the Mozilla Public License 2.0. See the [LICENSE](LICENSE) file for details.
