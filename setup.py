from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in accounts_app/__init__.py
from accounts_app import __version__ as version

setup(
	name="accounts_app",
	version=version,
	description="Accounts App",
	author="hammad",
	author_email="hammad@srptechs.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
