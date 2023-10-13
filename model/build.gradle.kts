plugins {
    id("software.amazon.smithy").version("0.6.0")
}

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    implementation("software.amazon.smithy:smithy-model:1.37.0")
    implementation("software.amazon.smithy.typescript:smithy-typescript-codegen:0.17.1")
    implementation("software.amazon.smithy:smithy-aws-traits:1.39.1")
}

configure<software.amazon.smithy.gradle.SmithyExtension> {
    // Uncomment this to use a custom projection when building the JAR.
    // projection = "foo"
}

buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("software.amazon.smithy.typescript:smithy-aws-typescript-codegen:0.12.0")
    }
}

// Uncomment to disable creating a JAR.
//tasks["jar"].enabled = false
