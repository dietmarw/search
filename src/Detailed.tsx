import React = require("react");
import semver = require('semver');

import { Library } from './Index';

import { fullscreen } from './Impact';

function SortVersion(a: string, b: string) {
	if (semver.gt(a, b)) return -1;
	if (semver.lt(a, b)) return 1;
	return 0;
}

class Props {
	  public library: Library;
}

class Component extends React.Component<Props, {}> {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		var lib = this.props.library;
		var name = lib.name;
		var homepage = lib.homepage;
		var stars = lib.stars;

		var vkeys = Object.keys(lib.versions).sort(SortVersion);

		var versions: JSX.Element[] = vkeys.map((k): JSX.Element => {
			var vdata = lib.versions[k];
			var zip = vdata.zipball_url;
			return <div key={k} className="label label-success vspan breaker">{k}</div>
		});

		var header = <h2>{name}</h2>;
		var site: JSX.Element = null;
		if (homepage!="") {
			site =
			<h4>
				Homepage: <a href={homepage}>{homepage}</a>
			</h4>;
		}

		var rating = 
		<h5 className="pullright">
			Rating: {stars} &nbsp;
			<span className="glyphicon glyphicon-star" aria-hidden="true"></span>
		</h5>;

		return (
			<div id="details">
				<div id="iheader" className={fullscreen()}>
					<a id="orglink" href="/#">
						<img id="logo" className="nav" src="img/logo_glossy.svg"/>
					</a>
				</div>
				<div className={fullscreen("rgroup")}>
					<div>
						{rating}
						{header}
						{site}
						<h4>Description</h4>
						<p>
							{this.props.library.description}
						</p>
						<h4>Versions</h4>
						<p className="centered">
							{versions}
						</p>
					</div>
				</div>
			</div>);
	}
}

export = Component;
