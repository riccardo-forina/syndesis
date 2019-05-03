import { Level, LevelItem, Popover, Text, Title } from '@patternfly/react-core';
import * as H from '@syndesis/history';
import { Card, DropdownKebab, Icon } from 'patternfly-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  ConfirmationButtonStyle,
  ConfirmationDialog,
  ConfirmationIconType,
} from '../Shared';

import './ConnectionCard.css';

export interface IConnectionCardMenuProps {
  editHref: H.LocationDescriptor;
  i18nCancelLabel: string;
  i18nDeleteLabel: string;
  i18nDeleteModalMessage: string;
  i18nDeleteModalTitle: string;
  i18nEditLabel: string;
  i18nMenuTitle: string;
  i18nViewLabel: string;
  isDeleteEnabled: boolean;

  onDelete(): void;
}

export interface IConnectionProps {
  configurationRequired: boolean;
  description: string;
  href: H.LocationDescriptor;
  i18nConfigurationRequired: string;
  i18nTechPreview: string;
  icon: string;
  menuProps?: IConnectionCardMenuProps;
  name: string;
  techPreview: boolean;
  techPreviewPopoverHtml?: JSX.Element;
}

export interface IConnectionCardState {
  showDeleteDialog: boolean;
}

export class ConnectionCard extends React.PureComponent<
  IConnectionProps,
  IConnectionCardState
> {
  public constructor(props: IConnectionProps) {
    super(props);

    this.state = {
      showDeleteDialog: false, // initial visibility of delete dialog
    };

    if (this.props.menuProps) {
      this.doCancel = this.doCancel.bind(this);
      this.doDelete = this.doDelete.bind(this);
      this.showDeleteDialog = this.showDeleteDialog.bind(this);
    }
  }

  public doCancel() {
    this.setState({
      showDeleteDialog: false, // hide dialog
    });
  }

  public doDelete() {
    this.setState({
      showDeleteDialog: false, // hide dialog
    });

    if (this.props.menuProps) {
      this.props.menuProps.onDelete();
    }
  }

  public showDeleteDialog() {
    this.setState({
      showDeleteDialog: true,
    });
  }

  public render() {
    return (
      <>
        {this.props.menuProps && (
          <ConfirmationDialog
            buttonStyle={ConfirmationButtonStyle.DANGER}
            i18nCancelButtonText={this.props.menuProps.i18nCancelLabel}
            i18nConfirmButtonText={this.props.menuProps.i18nDeleteLabel}
            i18nConfirmationMessage={
              this.props.menuProps.i18nDeleteModalMessage
            }
            i18nTitle={this.props.menuProps.i18nDeleteModalTitle}
            icon={ConfirmationIconType.DANGER}
            showDialog={this.state.showDeleteDialog}
            onCancel={this.doCancel}
            onConfirm={this.doDelete}
          />
        )}
        <Card matchHeight={true}>
          {this.props.menuProps && (
            <Card.Heading
              className={
                this.props.techPreview
                  ? null
                  : 'connection-card__heading--no-border'
              }
            >
              {this.props.techPreview ? (
                <Level gutter={'md'}>
                  <LevelItem>&nbsp;</LevelItem>
                  <LevelItem>
                    {this.props.i18nTechPreview}
                    {'  '}
                    <Popover
                      bodyContent={
                        <div>{this.props.techPreviewPopoverHtml}</div>
                      }
                      aria-label={'Tech Preview Popover'}
                    >
                      <Icon type={'pf'} name={'info'} />
                    </Popover>
                  </LevelItem>
                </Level>
              ) : (
                <Level gutter={'md'}>&nbsp;</Level>
              )}
              <div className="pull-right">
                <DropdownKebab
                  id={`connection-${this.props.name}-menu`}
                  pullRight={true}
                  title={this.props.menuProps.i18nMenuTitle}
                >
                  <li role={'presentation'} key={0}>
                    <Link to={this.props.href} role={'menuitem'} tabIndex={1}>
                      {this.props.menuProps.i18nViewLabel}
                    </Link>
                  </li>
                  <li role={'presentation'} key={1}>
                    <Link
                      to={this.props.menuProps.editHref}
                      role={'menuitem'}
                      tabIndex={2}
                    >
                      {this.props.menuProps.i18nEditLabel}
                    </Link>
                  </li>
                  <li
                    className={
                      !this.props.menuProps.isDeleteEnabled ? 'disabled' : ''
                    }
                    role={'presentation'}
                    key={2}
                  >
                    <a
                      href={'javascript:void(0)'}
                      onClick={this.showDeleteDialog}
                      role={'menuitem'}
                      tabIndex={3}
                    >
                      {this.props.menuProps.i18nDeleteLabel}
                    </a>
                  </li>
                </DropdownKebab>
              </div>
            </Card.Heading>
          )}
          <Link to={this.props.href} className={'connection-card'}>
            <Card.Body>
              <div className={'connection-card__content'}>
                <div className="connection-card__icon">
                  <img src={this.props.icon} alt={this.props.name} width={46} />
                </div>
                <Title
                  size="lg"
                  className="connection-card__title h2"
                  data-testid="connection-card-title"
                >
                  {this.props.name}
                </Title>
                <Text className="connection-card__description">
                  {this.props.description}
                </Text>
              </div>
            </Card.Body>
            {this.props.configurationRequired ? (
              <Card.Footer
                className={
                  this.props.techPreview
                    ? 'connection-card__footer--tech-preview alert alert-warning'
                    : null
                }
              >
                <Icon type={'pf'} name={'warning-triangle-o'} size={'2x'} />
                {this.props.i18nConfigurationRequired}
              </Card.Footer>
            ) : null}
          </Link>
        </Card>
      </>
    );
  }
}
