import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import Pagination from "../../../../containers/pages/Pagination";
import API from "../../../../helpers/API";
import ListPageHeading from "./list-heading";
import ActionListView from "./list-item-view";

class ListPage extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.state = {
      resourceName: "actions",

      pageSizes: [10, 20, 30, 50, 100],
      selectedPageSize: 10,

      orderOptions: [
        { column: "code", label: "Action #" },
        { column: "chiefId", label: "Chief" },
        { column: "workstreamId", label: "Workstream" },
        { column: "actionActualProgress", label: "Action Progress" }
      ],
      selectedOrderOption: { column: "code", label: "Action #" },

      search: "",

      items: [],
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,

      isLoading: true
    };
  }

  componentDidMount() {
    this.dataListRender();
  }

  changeOrderBy = column => {
    this.setState(
      {
        selectedOrderOption: this.state.orderOptions.find(
          x => x.column === column
        )
      },
      () => this.dataListRender()
    );
  };

  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  };

  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };

  onSearchKey = e => {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.dataListRender()
      );
    }
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  async dataListRender() {
    const {
      resourceName,
      selectedPageSize,
      currentPage,
      selectedOrderOption,
      search
    } = this.state;
    const params = {
      filter: {
        order: `${selectedOrderOption.column} ASC`,
        include: ["chief", "workstream", "substream"]
      }
    };
    if (search) {
      params.filter.where = {
        or: [
          {
            code: {
              ilike: `%${search}%`
            }
          },
          {
            action: {
              ilike: `%${search}%`
            }
          }
        ]
      };
    }

    // Get page count
    const countResponse = await this.API.get(`/${resourceName}/count`, {
      params
    });
    const pageCount = Math.ceil(countResponse.data.count / selectedPageSize);
    let tempCurrentPage = currentPage >= pageCount ? pageCount : currentPage;
    if (tempCurrentPage === 0) {
      tempCurrentPage = 1;
    }

    // Get current page
    const currentSkip = selectedPageSize * (tempCurrentPage - 1);

    const response = await this.API.get(`/${resourceName}`, {
      params: {
        ...params,
        filter: {
          ...params.filter,
          limit: selectedPageSize,
          skip: currentSkip
        }
      }
    });

    // Save state
    await this.setState({
      totalPage: pageCount,
      currentPage: tempCurrentPage,
      items: response.data,
      totalItemCount: countResponse.data.count,
      isLoading: false
    });
  }

  render() {
    const {
      isLoading,
      currentPage,
      items,
      selectedPageSize,
      totalItemCount,
      selectedOrderOption,
      totalPage,
      orderOptions,
      pageSizes
    } = this.state;
    const { match } = this.props;
    const startIndex = 1 + (currentPage - 1) * selectedPageSize;
    let endIndex = currentPage * selectedPageSize;
    endIndex = endIndex > totalItemCount ? totalItemCount : endIndex;

    if (isLoading) return <div className="loading" />;

    return (
      <Fragment>
        <div className="disable-text-selection">
          <ListPageHeading
            heading="Detailed Actions"
            changeOrderBy={this.changeOrderBy}
            changePageSize={this.changePageSize}
            selectedPageSize={selectedPageSize}
            totalItemCount={totalItemCount}
            selectedOrderOption={selectedOrderOption}
            match={match}
            startIndex={startIndex}
            endIndex={endIndex}
            onSearchKey={this.onSearchKey}
            orderOptions={orderOptions}
            pageSizes={pageSizes}
          />
          <Row>
            {items.map(item => (
              <ActionListView key={item.id} item={item} />
            ))}{" "}
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangePage={i => this.onChangePage(i)}
            />
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default ListPage;
