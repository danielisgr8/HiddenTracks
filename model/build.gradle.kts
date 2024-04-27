plugins {
    id("software.amazon.smithy").version("0.7.0")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("software.amazon.smithy:smithy-model:1.47.0")
    implementation("software.amazon.smithy.typescript:smithy-typescript-codegen:0.19.0")
    implementation("software.amazon.smithy:smithy-aws-traits:1.47.0")
}

configure<software.amazon.smithy.gradle.SmithyExtension> {
    // projection = "foo"
}

buildscript {
    dependencies {
        classpath("software.amazon.smithy.typescript:smithy-aws-typescript-codegen:0.19.0")
    }
}

tasks["jar"].enabled = false
