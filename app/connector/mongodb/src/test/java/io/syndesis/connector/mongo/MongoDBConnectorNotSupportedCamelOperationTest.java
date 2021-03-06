/*
 * Copyright (C) 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.syndesis.connector.mongo;

import io.syndesis.common.model.integration.Step;

import org.apache.camel.FailedToCreateRouteException;
import org.junit.Before;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;

import java.util.List;

public class MongoDBConnectorNotSupportedCamelOperationTest extends MongoDBConnectorTestSupport {

    // **************************
    // Set up
    // **************************

    @Override
    @Before
    public void setUp() {
        assertThatExceptionOfType(FailedToCreateRouteException.class).isThrownBy(() -> super.setUp())
            .withMessageContaining("Failed to resolve endpoint")
            .withMessageContaining("Operation not supported");
    }

    @Override
    protected List<Step> createSteps() {
        return fromDirectToMongo("start", "io.syndesis.connector:connector-mongodb-producer", DATABASE,
            COLLECTION, "somethingNotSupported");
    }

    // **************************
    // Tests
    // **************************

    @Test
    public void mongoTest() {
        assertTrue(true);
    }

}
